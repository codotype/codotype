echo "\nInstalling NGINX..."
sudo apt-get update
sudo apt-get install nginx

echo "\nInstalling Docker..."
curl -sSL https://get.docker.com/ | sh

echo "\nAdding vagrant user to docker group..."
sudo usermod -aG docker root

# # # # #

# echo "\nInstalling Docker Compose..."
sudo curl -o /usr/local/bin/docker-compose -L https://github.com/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m`
sudo chmod +x /usr/local/bin/docker-compose

# # # # #

# echo "\nInstalling Node.js..."
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential

# # # # #
server {

  listen 80;
  server_name alpha.blazeplate.io;
  charset utf-8;

  # Max body size of 1GB
  client_max_body_size 1000M;

  location / {
     root /www;
   }
}
# # # # #

touch /etc/nginx/sites-available/blazeplate

ln -s /etc/nginx/sites-available/blazeplate /etc/nginx/sites-enabled/blazeplate

# # # # #

cp /root/blazeplate_web_client/dist/index.html /www/index.html
cp -r /root/blazeplate_web_client/dist/static/ /www/
