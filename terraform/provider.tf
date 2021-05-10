terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
}


# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
    #Add those as env variables
  subscription_id = "4398a24f-81d9-469d-8b59-2f51ac63df2d"
  client_id       = "19dced19-761d-475d-94ae-68c5e77cca98"
  client_secret   = "L63ik12-ywksa.U0eW.l-w4EnF_VaA-qtP"
  tenant_id       = "a2e466aa-4f86-4545-b5b8-97da7c8febf3"

  # subscription_id = github_actions_secret.gym_subscription_id
  # client_id       = github_actions_secret.gym_client_id
  # client_secret   = github_actions_secret.gym_client_secret
  # tenant_id       = github_actions_secret.gym_tenant_id
}