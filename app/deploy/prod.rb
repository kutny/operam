server '52.214.102.239', user: 'ubuntu', roles: %w{web app}
set :ssh_options, {
    forward_agent: true,
    user: "ubuntu",
    port: 22
}
