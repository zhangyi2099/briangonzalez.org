require 'sinatra/base'

module Sinatra
  module InkSync

    module Helpers

      def git_status
        f = nil;
        git_root { 
          f = open("| git status") 
          f.close
        } 
        f.read
      end

      def git_pull
        pull = false
        git_root { pull = system("git pull") }
        pull ? "Succesfully pulled site." : "Error while pulling." 
      end

      def git_sync
        add, commit, pull, push = false, false, false, false
        git_root { 
          add     = system("git add .") 
          commit  = system("git commit -am 'Saved Inkpress site @ #{Time.now.to_datetime.strftime "%a, %d %b %Y, %l:%M%P"}'") if add
          pull    = system("git pull") if commit 
          push    = system("git push") if pull
        } 
        success = add && commit && pull && push
        success ? "Sync'd succesfully." : "Error encountered while syncing."
      end

      def git_root(&blk)
        Dir.chdir(settings.root) do
          blk.call
        end
      end

    end

    def self.registered(app)

      app.get '/ink/sync/status' do
        halt 403 unless logged_in? 
        content_type :json
        output = git_status.gsub(/\n/, '<br>')
        return { :output => output }.to_json
      end

      app.post '/ink/sync/save' do
        halt 403 unless logged_in? 
        content_type :json
        output = git_sync.gsub(/\n/, '<br>')
        return { :output => output }.to_json
      end

      app.post '/ink/sync/pull' do
        halt 403 unless logged_in? 
        content_type :json
        output = git_pull.gsub(/\n/, '<br>')
        return { :output => output }.to_json
      end

    end

  end

  register InkSync
end
