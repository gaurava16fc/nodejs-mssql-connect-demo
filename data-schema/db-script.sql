USE [master]
GO

-- Check if DB already exists then drop DB
IF DB_ID(N'node-mssql-connect-db') IS NOT NULL
	BEGIN
		DROP DATABASE [node-mssql-connect-db]
	END
GO

-- Check if new Login already exists then drop Login
IF EXISTS (SELECT 'x' FROM master.sys.server_principals WHERE name = 'demoLogin')
	BEGIN
		DROP LOGIN [demoLogin] 
	END
GO


-- Create new DB
CREATE DATABASE [node-mssql-connect-db]
GO

-- Create new login...
CREATE LOGIN [demoLogin] WITH PASSWORD=N'test123', DEFAULT_DATABASE=[node-mssql-connect-db]
GO

-- Add new Login to Server Role 'SysAdmin'
ALTER SERVER ROLE [sysadmin] ADD MEMBER [demoLogin]
GO

USE [node-mssql-connect-db]
GO

-- Create new user...
CREATE USER [demoUser] FOR LOGIN [demoLogin]
GO

-- Align Default Schema to new user
ALTER USER [demoUser] WITH DEFAULT_SCHEMA=[dbo]
GO

-- Add new user to dbo role
ALTER ROLE [db_owner] ADD MEMBER [demoUser]
GO

USE [node-mssql-connect-db]
GO

IF OBJECT_ID(N'[dbo].[product_reviews]') IS NOT NULL
	DROP TABLE [dbo].[product_reviews]
GO

/****** Object:  Table [dbo].[product_reviews]    Script Date: 10-02-2022 19:52:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[product_reviews]
(
	[id] [int] IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
	[pid] [int] NULL,
	[title] [varchar](250) NULL,
	[review] [text] NULL,
	[rating] [tinyint] NULL
 CONSTRAINT [PK_product_reviews] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

INSERT INTO [dbo].[product_reviews]
	([pid], [title], [review], [rating])
VALUES
	(22289,'Poor Durability','Installed these on Mother walker. Found the pads were completely wore through the fabric and rubber layers of the pads within ONE week!',1),
	(23488,'rating not very high','The tricycle would not back up unless you raised the drive wheel and then you could push it backwards, this was not desireable',2),
	(37194,'amazing!','keeps beverages *hot* all day!',5),
	(651,'4...could not give a 5 star rating because of strip(wheel) prices','Great product, but test wheels are very expensive',4),
	(22773,'Cost outrageous','I dont know why you are charging over 50.00 for this program when the TRX site sells if for far less!!!!',1),
	(70960,'HEAVY DUTY Super EZ Curl Bar','This high quality Super Ez Curl Bar provides a solid grip with its 32mm diameter bar, excellent knurling. The sharper angles and closer grip are very comfortable. This bar gives a different and very useful alternate workout than a regular EZ Curl bar.',5)
GO

SELECT * FROM [dbo].[product_reviews]
GO

IF OBJECT_ID(N'GetProductReviews') IS NOT NULL
	DROP PROCEDURE GetProductReviews
GO

CREATE PROCEDURE GetProductReviews
(
	@ID INT = NULL
)
AS
BEGIN
	SET NOCOUNT ON
	DECLARE @reviewID INT = @ID
	SELECT [id], [pid], [title], [review], [rating] FROM [dbo].[product_reviews] WHERE ([id] = @reviewID OR @reviewID IS NULL)
	SET NOCOUNT ON
END
GO

EXEC GetProductReviews 5
GO