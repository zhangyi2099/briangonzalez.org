require "highline/import"
Rake::TaskManager.record_task_metadata = true

namespace :ink do
  
  desc "Starting Inkpress Server (Thin) in development mode (-e for production)"
  task :start do |task|
    puts "*** " + task.full_comment

    production = ENV.has_key?('emulate_production') ? '-e production' : ''
    port       = ENV['port'] || 4224
    system("bundle exec thin start -R config.ru -p #{port} #{production}")
  end

end

