terraform {
  required_providers {
    azurerm         = {
      source        = "hashicorp/azurerm"
      version       = "=2.46.0"
    }
  }
  backend "remote" {
    organization    = "simplon"
    subscription_id = github_actions_secret.gym_subscription_id
    client_id       = github_actions_secret.gym_client_id
    client_secret   = github_actions_secret.gym_client_secret
    tenant_id       = github_actions_secret.gym_tenant_id

    workspaces {
      name          = "github-actions-demo"
    }
  }


# Configure the Microsoft Azure Provider
# provider "azurerm" {
#   features {}
#     #Add those as env variables
#     subscription_id = github_actions_secret.gym_subscription_id
#     client_id       = github_actions_secret.gym_client_id
#     client_secret   = github_actions_secret.gym_client_secret
#     tenant_id       = github_actions_secret.gym_tenant_id
#   }
}