#--------------------------------#
#   outputs basics azure config  #
#--------------------------------#

output "resource-groupe-nam" {
  value = data.azurerm_resource_group.GymResourceGroup.name
}

output "Vnet-name" {
  value = azurerm_virtual_network.VnetGym.name
}


output "Gym_vnet_ip_range" {
  value = azurerm_virtual_network.VnetGym.address_space
}


output "public_ip_address" {
  value = azurerm_public_ip.GymBackPublicIp.ip_address
}


#--------------------------------#
#   outputs blob storage         #
#--------------------------------#

# output "containers_names" {
#   value = azurerm_storage_container.memestorage.url
# }

#--------------------------------#
#   outputs app service API      #
#--------------------------------#


