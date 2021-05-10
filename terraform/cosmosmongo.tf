resource "azurerm_cosmosdb_account" "gym_cosmos_account" {
    name                = "gym-cosmos-account"
    resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
    location            = data.azurerm_resource_group.GymResourceGroup.location
    offer_type          = "Standard"

    consistency_policy {
        consistency_level = "session"
    }

    geo_location {
        location          = data.azurerm_resource_group.GymResourceGroup.location
        failover_priority = 0
    }

    
    capabilities {
        name = "mongoEnableDocLevelTTL"
    }

    capabilities {
        name = "MongoDBv3.4"
    }


}

resource "azurerm_cosmosdb_mongo_database" "mydb" {
    name                = "mydb"
    resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
    account_name        = azurerm_cosmosdb_account.gym_cosmos_account.name
    throughput          = 400
}

resource "azurerm_cosmosdb_mongo_database" "address_collection" {
    name                = "address-collection"
    resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
    account_name        = azurerm_cosmosdb_account.gym_cosmos_account.name
    throughput          = 400
}
