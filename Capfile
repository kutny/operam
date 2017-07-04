set :deploy_config_path, 'app/deploy.rb'
set :stage_config_path, 'app/deploy'

require "capistrano/setup"
require "capistrano/deploy"

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }