# vars basics config:
resource_group_name    = "terraform"
location               = "East US"
public_ip_name         = "GymPublicBackIp"
virtual_network_name   = "VnetGym"

#vars blob storage
storage_account_name   = "gymblobstorage"

#vars app service plan
app_service_plan_name = "gym_appserviceplan"
app_service_name      = "exposebackapi"

#git repository
git_repo              = "https://github.com/thibault-Merelle/Gym.git"