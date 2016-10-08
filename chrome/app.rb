require 'sinatra'
require 'json'

require File.expand_path('../lib/social-browsing.rb', __FILE__)

browsing_data = []

get '/' do
  File.read(File.join('public', 'index.html'))
end

post '/update_current' do
  content_type :json
  browsing_data.push({
    'url' => params[:url],
    'date' => params[:date]
  })
end

get '/get_browsing_data' do
  browsing_data.to_json
end
