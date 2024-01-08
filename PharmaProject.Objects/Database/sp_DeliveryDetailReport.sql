USE [PharmaProject]
GO
/****** Object:  StoredProcedure [dbo].[GetDeliveryDetails]    Script Date: 1/3/2024 8:37:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Sydney Jeffries
-- Create date: 12.30.2023
-- Description:	All delivery records - dont show any ID columns - but instead show the Warehouse From name and the Pharmacy To name. 
-- don't include anything to remove inactive warehouse bc that dosn't invalidate a delivery that was done.
-- =============================================
Create PROCEDURE [dbo].[sp_DeliveryDetailReport]

AS
BEGIN

	SET NOCOUNT ON;

	SELECT 
		DR.DrugName,
		W.[Name] as 'WhareHouseName',
		P.[Name] as 'PharmacyName',
		D.UnitCount,
		D.UnitPrice, 
		D.TotalPrice,
		D.DeliveryDate,
		D.Active,
		D.CreatedBy
	FROM dbo.Delivery AS D
	INNER JOIN Drug AS DR ON DR.DrugId = D.DrugId
	INNER JOIN Warehouse AS W ON W.WarehouseId = D.WarehouseId
	INNER JOIN Pharmacy AS P ON P.PharmacyId = D.PharmacyID
	WHERE D.Active = 1 AND P.Active = 1 

END
