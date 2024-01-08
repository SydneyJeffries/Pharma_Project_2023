USE [PharmaProject]
GO
/****** Object:  StoredProcedure [dbo].[procGetPharmacistSalesDetails]    Script Date: 1/3/2024 9:25:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sydney Jeffries
-- Create date: 12.31.23
-- Description:	List all Pharmacists each with Pharmacy Name they work at, 
--name of their primary drug, total unit count that their pharmacy sold of their primary drug, 
--and total sold not of their primary drug. 
-- =============================================
Create PROCEDURE [dbo].[sp_PharmacistSaleReport]


AS
BEGIN

CREATE TABLE #rankedPharmasistDrugSales (
    PharmacistId INT,
    DrugId INT,
    RankNum INT,
    UnitCountOfDrugSold INT
);

INSERT INTO #rankedPharmasistDrugSales (PharmacistId, DrugId, RankNum, UnitCountOfDrugSold)
SELECT
    S.PharmacistId,
    S.DrugId,
    ROW_NUMBER() OVER (PARTITION BY S.PharmacistId ORDER BY COUNT(*) DESC) AS RankNum,
    COUNT(*) AS UnitCountOfDrugSold
FROM Sale S
JOIN Pharmacist AS P ON S.PharmacistId = P.PharmacistId
WHERE S.Active = 1 AND P.Active = 1
GROUP BY S.PharmacistId, S.DrugId;

WITH PharmacistPrimaryDrugStats AS (
	SELECT
		#RP.PharmacistId,
		#RP.DrugId AS PrimaryDrugId,
		D.DrugName As PrimaryDrug,
		#RP.UnitCountOfDrugSold AS TotalUnitCountPrimaryDrug
	FROM #rankedPharmasistDrugSales #RP
	JOIN Drug D ON #RP.DrugId = D.DrugId
	WHERE #RP.RankNum = 1
)

SELECT
    P.PharmacistId,
    P.FirstName,
    P.LastName,
    Ph.Name AS PharmacyName,
    PDS.PrimaryDrug AS PrimaryDrug,
    SUM(CASE WHEN #RP.RankNum = 1 THEN #RP.UnitCountOfDrugSold ELSE 0 END) AS TotalUnitCountPrimaryDrug,
    SUM(CASE WHEN #RP.DrugId <> P.PrimaryDrugId THEN 1 ELSE 0 END) AS TotalUnitCountOtherDrugs
FROM Pharmacist P
JOIN Pharmacy Ph ON P.PharmacyId = Ph.PharmacyId
JOIN #rankedPharmasistDrugSales #RP ON P.PharmacistId = #RP.PharmacistId
JOIN PharmacistPrimaryDrugStats AS PDS ON P.PharmacistId = PDS.PharmacistId
WHERE P.Active = 1 
GROUP BY
    P.PharmacistId,
    P.FirstName,
    P.LastName,
    Ph.Name,
    PDS.PrimaryDrug;

DROP TABLE #rankedPharmasistDrugSales;

--- USING GROUP BY W DELIVERY DATA
	--SELECT 
	--	P.PharmacistId,
	--	P.FirstName,
	--	P.LastName,
	--	Ph.Name AS PharmacyName,
	--	Dref2.DrugName AS PrimaryDrug,
	--	SUM(CASE WHEN DRef.DrugId = P.PrimaryDrugId THEN D.UnitCount ELSE 0 END) AS TotalUnitCountPrimaryDrug,
	--	SUM(CASE WHEN DRef.DrugId <> P.PrimaryDrugId THEN D.UnitCount ELSE 0 END) AS TotalUnitCountOtherDrugs
	--FROM Pharmacist P
	--JOIN Pharmacy Ph ON P.PharmacyId = Ph.PharmacyId
	--JOIN Delivery D ON P.PharmacyId = D.PharmacyId
	--JOIN Drug DRef ON D.DrugId = DRef.DrugId
	--JOIN Drug Dref2 ON Dref2.DrugId = P.PrimaryDrugId
	--WHERE P.Active = 1 AND D.Active = 1
	--GROUP BY
	--	P.PharmacistId,
	--	P.FirstName,
	--	P.LastName,
	--	Ph.Name,
	--	P.PrimaryDrugId,
	--	Dref2.DrugName
	

--- USING PARTITIONS INSTEAD:
--WITH PharmacistsWDrugTotalsRanked AS (
--    SELECT 
--        P.PharmacistId,
--        P.FirstName,
--        P.LastName,
--        Ph.Name as PharmacyName,
--        Dref2.DrugName AS PrimaryDrug,
--        SUM(CASE WHEN DRef.DrugId = P.PrimaryDrugId THEN D.UnitCount ELSE 0 END) 
--            OVER (PARTITION BY P.PharmacistId) AS TotalUnitCountPrimaryDrug,
--        SUM(CASE WHEN DRef.DrugId <> P.PrimaryDrugId THEN D.UnitCount ELSE 0 END) 
--            OVER (PARTITION BY P.PharmacistId) AS TotalUnitCountOtherDrugs,
--        ROW_NUMBER() OVER (PARTITION BY P.PharmacistId ORDER BY D.UnitCount DESC) AS RowNum
--    FROM Pharmacists P
--    JOIN Pharmacies Ph ON P.PharmacyId = Ph.PharmacyId
--    JOIN Deliveries D ON P.PharmacyId = D.PharmacyId
--    JOIN DrugsRef DRef ON D.DrugId = DRef.DrugId
--	JOIN DrugsRef DRef2 ON P.PrimaryDrugId = DRef2.DrugId
--)

--SELECT 
--    PharmacistId,
--    FirstName,
--    LastName,
--    PharmacyName,
--    PrimaryDrug,
--    TotalUnitCountPrimaryDrug,
--    TotalUnitCountOtherDrugs
--FROM PharmacistsWDrugTotalsRanked
--WHERE RowNum = 1;

END