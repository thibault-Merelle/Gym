provider "azurerm" {
  features {}
}
provider "github" {
}
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
    github = {
      source = "integrations/github"
      version = "~> 4.9.4"
    }
  }
  backend "azurerm" {
    resource_group_name  = "terraform"
    storage_account_name = "gymblobstoragebackend"
    container_name       = "terraformci"
    key                  = "terraform.tfstate"
    
    access_key           = "Ue+RAvoV9XUBSpm7fAi3NU7O80b0E3mRoHThWHbk3QLzhkiR0L/UPBkVuRFRb2HWMp/2KalAGwxBXydHs2hSEQ=="
  }
}




# terraform {
#   required_providers {
#     azurerm = {
#       source  = "hashicorp/azurerm"
#       version = "=2.46.0"
#     }
#   }
# }


# # Configure the Microsoft Azure Provider
# provider "azurerm" {
#   features {}
#     #Add those as env variables

#   subscription_id = github_actions_secret.gym_subscription_id
#   client_id       = github_actions_secret.gym_client_id
#   client_secret   = github_actions_secret.gym_client_secret
#   tenant_id       = github_actions_secret.gym_tenant_id
# }

# terraform {
#   required_providers {
#     aws = {
#       source = "hashicorp/aws"
#     }
#     random = {
#       source = "hashicorp/random"
#     }
#   }

#   backend "remote" {
# -   organization = "REPLACE_ME"
# +   organization = "YOUR_ORGANIZATION_NAME"

#     workspaces {
#       name = "gh-actions-demo"
#     }
#   }
# }