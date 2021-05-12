#--------------------------------#
#   init basics azure config     #
#--------------------------------#

# Create a resource group id = GymResourceGroup
# resource "azurerm_resource_group" "GymResourceGroup" {
#   name     = var.resource_group_name
#   location = var.location # ou "${var.region}"
  
#   tags = {
#     environment = "devlopment"
#     project     = "memelon"
#     groupe      = "Youcef-Jordan_t-Biben-Thibault"
#     country     = "france"
#   }
# }

data "azurerm_resource_group" "GymResourceGroup" {
  name = "terraform"
}

output "id" {
  value = data.azurerm_resource_group.GymResourceGroup.id
}


resource "azurerm_public_ip" "GymBackPublicIp" {
  name                = "${var.public_ip_name}"
  resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
  location            = data.azurerm_resource_group.GymResourceGroup.location
  allocation_method   = "Static"

  tags = {
    environment = "devlopment"
    project     = "memelon"
    groupe      = "Youcef-Jordan_t-Biben-Thibault"
    country     = "france"
  }
}


#call resource groupe credentials
resource "azurerm_virtual_network" "VnetGym" {
  name                = var.virtual_network_name
  location            = data.azurerm_resource_group.GymResourceGroup.location
  resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
  address_space       = ["10.0.0.0/16"]

  tags = {
    environment = "devlopment"
    project     = "memelon"
    groupe      = "Youcef-Jordan_t-Biben-Thibault"
    country     = "france"
  }
}

#--------------------------------#
#         azure blob storage     #
#--------------------------------#


resource "azurerm_storage_account" "GymBlob" {
  name                     = var.storage_account_name
  resource_group_name      = data.azurerm_resource_group.GymResourceGroup.name
  location                 = data.azurerm_resource_group.GymResourceGroup.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  allow_blob_public_access = true

  tags = {
    environment = "devlopment"
    project     = "memelon"
    groupe      = "Youcef-Jordan_t-Biben-Thibault"
    country     = "france"
  }
}


resource "azurerm_storage_container" "memestorage" {
  count                 = length(var.containers_names)
  name                  = var.containers_names[count.index]
  storage_account_name  = azurerm_storage_account.GymBlob.name
  container_access_type = "private"
}

resource "azurerm_storage_blob" "myblob" {
  name                   = "myblob.txt"
  storage_account_name   = azurerm_storage_account.GymBlob.name
  storage_container_name = azurerm_storage_container.memestorage.name
  type                   = "Block"
  source                 = "myblob.txt"
}

#--------------------------------#
#        Shared access Secrets   #
#--------------------------------#



data "azurerm_storage_account_sas" "sas" {
    connection_string = azurerm_storage_account.GymBlob.primary_connection_string
    https_only = true
    start = "2021-05-04"
    expiry = "2021-12-31"
    resource_types {
        object = true
        container = false
        service = false
    }
    services {
        blob = true
        queue = false
        table = false
        file = false
    }
    permissions {
        read = true
        write = false
        delete = false
        list = false
        add = false
        create = false
        update = false
        process = false
    }
}





#--------------------------------#
#         azure web app API      #
#--------------------------------#

resource "azurerm_app_service_plan" "gym_appserviceplan" {
  name                = var.app_service_plan_name
  location            = data.azurerm_resource_group.GymResourceGroup.location
  resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
  kind                = "Linux"
  reserved            = false

  sku {
    tier = "Standard"
    size = "S1"
  }

  tags = {
    environment = "devlopment"
    project     = "memelon"
    groupe      = "Youcef-Jordan_t-Biben-Thibault"
    country     = "france"
  }
}

resource "azurerm_app_service" "exposeapi" {
  name                = var.app_service_name
  location            = data.azurerm_resource_group.GymResourceGroup.location
  resource_group_name = data.azurerm_resource_group.GymResourceGroup.name
  app_service_plan_id = azurerm_app_service_plan.gym_appserviceplan.id

  site_config {
    dotnet_framework_version = "v4.0"
    scm_type                 = "LocalGit"
  }

  app_settings = {
    "SOME_KEY" = "some-value"
  }

  connection_string {
    name  = "Database"
    type  = "SQLServer"
    value = "Server=some-server.mydomain.com;Integrated Security=SSPI"
  }

  provisioner "name" {
  
  }

  tags = {
    environment = "devlopment"
    project     = "memelon"
    groupe      = "Youcef-Jordan_t-Biben-Thibault"
    country     = "france"
  }
}