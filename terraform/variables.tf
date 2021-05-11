# vars declaration basics config:

variable "resource_group_name" {
  type        = string
  description = "terraform"
}

variable "location" {
  type        = string
  description = "East US"
}

variable "public_ip_name" {
  type        = string
  description = "GymPublicBackIp"
}

variable "virtual_network_name" {
  type        = string
  description = "VnetGym"
}


# vars declaration blob storage

variable "storage_account_name" {
  type        = string
  description = "gymblobstorage"
}

variable "containers_names" {
  type        = list(string)
  default     = ["inputs", "outputs"]
}

#vars blob storage backend
# variable "storage_account_name_backend" {
#   type        = string
#   description = "gymblobstoragebackend"
# }

# variable "container_name_backend" {
#   type        = string
#   description = "terraformci"  
# }


# vars declaration app service

variable "app_service_plan_name" {
  type        = string
  description = "gym_appserviceplan"
}       

variable "app_service_name" {
    type         = string
    description  = "exposebackapi" 
  
}

variable "git_repo" {
  type          = string
  description   = "https://github.com/thibault-Merelle/Gym.git"  
}