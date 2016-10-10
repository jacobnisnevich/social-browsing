require 'sinatra'
require 'json'

require File.expand_path('../lib/social-browsing.rb', __FILE__)

browsing_data = []

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/update_current' do
  browsing_data['username'] = {
    'url' => params[:url].to_s,
    'date' => params[:date].to_s
  }
  ''
end

get '/get_browsing_data' do
  browsing_data.to_json
end
