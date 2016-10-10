require 'sinatra'
require 'json'

require File.expand_path('../lib/social-browsing.rb', __FILE__)

browsing_data = {}
id = 0;

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/update_current' do
  browsing_data[params[:username]] = {
    'url' => params[:url],
    'date' => params[:date]
  }

  id += 1
end

get '/get_browsing_data' do
  {
    'data' => browsing_data,
    'id' => id
  }.to_json
end
