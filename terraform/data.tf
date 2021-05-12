# data "github_actions_public_key" "secrets" {
#   repository = var.git_repo
# }

# resource "github_actions_secret" "gym_subscription_id" {
#   repository       = var.git_repo
#   secret_name      = "subscription_id"
#   plaintext_value  = var.some_secret_string
# }

# resource "github_actions_secret" "gym_client_id" {
#   repository       = var.git_repo
#   secret_name      = "client_id"
#   plaintext_value  = var.some_secret_string
# }

# resource "github_actions_secret" "gym_client_secret" {
#   repository       = var.git_repo
#   secret_name      = "client_secret"
#   plaintext_value  = var.some_secret_string
# }

# resource "github_actions_secret" "gym_tenant_id" {
#   repository       = var.git_repo
#   secret_name      = "tenant_id"
#   plaintext_value  = var.some_secret_string
# }