USE [PharmaProject]
GO
/****** Object:  StoredProcedure [dbo].[GetWarehouseProfit]    Script Date: 1/3/2024 8:42:36 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		SYDNEY JEFFRIES
-- Create date: 12.30.23
-- Description: List of the 3 warehouses - with a column showing total delivery revenue and total unit count for each, and total revenue/units average profit.
--Order by most revenue to least.
-- two parameters that will let you specify a rank or range of ranks:
-- -1, 2 will return the last two ranks
-- -1, will return the last rank
-- 1 will return the first rank
-- 1, 2 will return the first two ranks
-- null, null will return all the ranks
-- =============================================
CREATE PROCEDURE [dbo].[sp_GetWarehouseProfit] 
    @Rank INT = Null,
    @RangeCount INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @ActualRangeCount INT
	SET @ActualRangeCount = @RangeCount - 1;

    WITH RankedWarehouses AS (
        SELECT
            W.Name AS WarehouseName,
            SUM(D.TotalPrice) AS TotalRevenue,
            SUM(D.UnitCount) AS TotalUnitCount,
            SUM(D.TotalPrice) / SUM(D.UnitCount) AS AverageProfitPerUnit,
            ROW_NUMBER() OVER (ORDER BY SUM(D.TotalPrice) DESC) AS WarehouseRank
        FROM Warehouse W
        INNER JOIN Delivery D ON W.WarehouseId = D.WarehouseId
		WHERE D.Active = 1 AND W.Active = 1
        GROUP BY
            W.Name
    )

    SELECT
        WarehouseName,
        TotalRevenue,
        TotalUnitCount,
        AverageProfitPerUnit
    FROM
        RankedWarehouses
    WHERE
        (@RangeCount IS NULL AND 
            (@Rank >= 1 AND WarehouseRank = @Rank) OR
            (@Rank < 1 AND WarehouseRank = (SELECT MAX(WarehouseRank) FROM RankedWarehouses)))
        OR (@RangeCount IS NOT NULL AND
            (@Rank >= 1 AND WarehouseRank BETWEEN @Rank AND (@Rank + @ActualRangeCount)) OR
            (@Rank < 1 AND WarehouseRank BETWEEN (SELECT MAX(WarehouseRank) FROM RankedWarehouses) - @ActualRangeCount AND (SELECT MAX(WarehouseRank) FROM RankedWarehouses) ))
		OR (
			@Rank IS Null AND @RangeCount IS NULL
		)
    ORDER BY TotalRevenue DESC;
END

-- WITH OUT RANKING 
--ALTER PROCEDURE [dbo].[GetWarehouseProfit]
--AS
--BEGIN
--	SET NOCOUNT ON;

--		SELECT
--			W.Name AS WarehouseName,
--			SUM(D.TotalPrice) AS TotalRevenue,
--			SUM(D.UnitCount) AS TotalUnitCount,
--			SUM(D.TotalPrice) / Sum(D.UnitCount) as AverageProfitPerUnit
--		FROM
--			Warehouses W
--		JOIN
--			Deliveries D ON W.WarehouseId = D.WarehouseId
--		GROUP BY
--			W.Name
--		ORDER BY TotalRevenue DESC
--END