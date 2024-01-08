USE [PharmaProject]
GO
/****** Object:  StoredProcedure [dbo].[GetMostDemandedDrugs]    Script Date: 1/3/2024 8:40:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:	Sydney Jeffries
-- Create date: 12.31.23
-- Description:	Most Demanded Drugs by delivery in order from most to least for pharmacyId
-- =============================================
Create PROCEDURE [dbo].[sp_MostDemandedDrugReport] 
@PharmacyId INT = NULL

AS
BEGIN
	SET NOCOUNT ON;

	WITH DeliveredDrugs AS (
		SELECT
			DrugId,
			SUM(UnitCount) AS TotalUnitCount
		FROM
			Delivery
		WHERE
			(@PharmacyId IS NULL OR PharmacyId = @PharmacyId)
			AND Active = 1
		GROUP BY
			DrugId
	)

	SELECT
		D.DrugId,
		D.DrugName,
		DD.TotalUnitCount
	FROM
		DeliveredDrugs DD
		JOIN Drug D ON DD.DrugId = D.DrugId
	ORDER BY DD.TotalUnitCount DESC


END
