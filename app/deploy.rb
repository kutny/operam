lock '3.6.1'
set :pty, true
set :application, "operam"
set :deploy_to,   "/var/www/operam"
set :user,        "ubuntu"
set :repo_url, "git@github.com:kutny/operam.git"
set :scm, :git
set :scm_verbose, true
set :branch, ENV["branch"] || 'master'
set :keep_releases, 5
set :format_options, log_file: "logs/capistrano.log"

set :use_sudo, false

after 'deploy:updated', 'deploy:docker:set_logs_permissions'
after 'deploy:updated', 'deploy:docker:build'
after 'deploy:updated', 'deploy:docker:node_modules_install'
after 'deploy:updated', 'deploy:docker:recreate_containers'
after 'deploy:finished', 'deploy:finish_deploy'
namespace :deploy do

    namespace :docker do

        desc "Set logs permissions for www-data"
        task :set_logs_permissions do
            on roles :all do
                execute :sudo, "setfacl -dR -m u:www-data:rwX #{release_path}/logs"
                execute :sudo, "setfacl -R -m u:www-data:rwX #{release_path}/logs"
            end
        end

        desc "Build docker images"
        task :build do
            on roles :all do
                execute "sudo docker-compose -f #{release_path}/docker-compose-prod.yml -p #{fetch(:application)} build"
            end
        end

        desc "Install node.js modules"
        task :node_modules_install do
            on roles :all do
                execute "sudo docker-compose -f #{release_path}/docker-compose-prod.yml -p #{fetch(:application)} run --rm operam-node npm install"
                execute "sudo chown -R ubuntu:ubuntu #{release_path}/node_modules"
            end
        end

        desc "Recreate containers"
        task :recreate_containers do
            on roles :all do
                execute "sudo docker-compose -f #{release_path}/docker-compose-prod.yml -p #{fetch(:application)} up -t 60 -d --force-recreate --build"
            end
        end

    end

    desc "Finish deploy"
    task :finish_deploy do
        on roles :all do
            puts "==> Deployed #{fetch(:branch)} branch <=="
        end
    end

end
