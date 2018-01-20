Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.hostname = "scotchbox"
    
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "./.nginx", "/etc/nginx/sites-enabled", :mount_options => ["dmode=777", "fmode=666"]
    
    config.vm.provision :shell, path: "bootstrap.sh"
end

# note that for some reason vagrant up won't work for dev, it's need re-provisioning: vagrant up --provision