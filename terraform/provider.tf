provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {
}

terraform {
  # required_providers {
  #   azurerm = {
  #     source  = "hashicorp/azurerm"
  #     version = "=2.46.0"
  #   }
  # }
  backend "azurerm" {
    resource_group_name  = "terraform"
    storage_account_name = "gymblobstoragebackend"
    container_name       = "terraformci"
    key                  = "terraform.tfstate"
  }
}