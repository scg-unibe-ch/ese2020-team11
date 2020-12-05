# CRC Cards

Left Column = Responsibilities; Right Column = Collaborators

| User ||
|-|-|
| has Attributes (like userId, boolcoin (money), ...) | UserModel |
| can Register/Login | Data Base |
| Make Order/"Buy" | MarketPlace  |
| Offer/Modify a (own) Product/Service | Product-DataService|
|| Product|


| Admin | |
|-|-|
| approve or disapprove(delete) a product| Product (Model)|
||Product-DataService|
|| User-DataService|

| Product(/Service) ||
|-|-|
| has Attributes (like price, name, description,...)| ProductModel |
| can be bought | Data Base |
| can be changed/removed | MarketPlace|
|| Product-DataService |
|| UserDashboard |
|| User |

|User-DataService||
|-|-|
| gathers, holds and delivers user information | Database |

|Product-DataService||
|-|-|
| holds all information about the diffrent "Product"-Lists (like bought, selling,..) | Data Base |
| can make order | User |
| can delete Products | Product |
| can modify Products | User-DataService |
| can approve Products | Product-DataService |
|| Admin |

| MarketPlace | |
|-|-|
| knows List of Approved and Available Products | Product |
| can filter Products | Product-DataService |
| allows only loged in user to do purchase | User-DataService |
|| User |

| UserDashboard | |
|-|-|
| shows Information about User (-Data) | User |
| allows to create, delete and modify own Products | User-DataService |
|| Product |
|| Product-Dataservice |

| AdminApproval | |
|-|-| 
| has a list of unapproved Products | Product |
| able to delete (unnaporved) Products or approve Products | Product-DataService|
|| User |
|| Admin |
|| User-DataService|

