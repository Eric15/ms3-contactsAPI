# MS3-ContactAPI
Senior Coding Challenge for MS3 | Author: Eric Nelson | Version: 0.1

## Description
Write an API for a Contacts database, as specified in /model/MS3-ContactAPI_DataModel-Src.json

## Build Instructions (in CLI)
(Make sure Docker is installed)
* docker run -p 49160:8080 -d augmentsoftware/ms3-contactsapi
  
- Host: http://localhost
- Port: 49160

## Contents
### Database:
#### SQL Definition File and Entity Relationship Diagram
* /model/MS3-ContactAPI_DataModel-SQLDefinition_v0.1ewn.sql
* /model/EntityRelationshipDiagram_09_03_2018.png

### API Routes:
#### POST
* /create.html -- 3 webforms for POSTing new records to Identification, Address, and Communication tables
1. /contact_create -- POST to Identification table
2. /address_create -- POST to Address table
3. /communication_create -- POST to Communication table

#### GET
1. /contacts -- GET all Identification records
2. /contacts/:contact_id -- GET Identification record where contact_id = :id
3. /addresses -- GET all Address records
4. /addresses/:contact_id -- GET all Address records where contact_id = :id
5. /communications -- GET all Communication records
6. /communications/:contact_id -- GET all Communication records where contact_id = :id

#### PUT
1. /contact_update -- PUT to Identification record
2. /address_update -- PUT to Address record
3. /communication_update -- PUT to Communication record

#### DELETE
1. /contact_delete/:contact_id -- DELETE Identification record and associated Address and Communication records
2. /address_delete/:address_id -- DELETE Address record
3. /communication_delete/:communication_id -- DELETE Communication record

### Docker
* /Dockerfile

## To Do
* Create AJAX client-side UI
* Sortable HTML table for GET request data
* Refactor contact.js --> identification.js, address.js, communication.js
* Refactor contact.js with HTTP Request error/success functions
* Circle CI configuration file (/.circleci/config.yml)
* Unit Test for each HTTP Method
* Hosted build on Heroku
