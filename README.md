# MS3-ContactAPI
Senior Coding Challenge for MS3 | Author: Eric Nelson | Version: 0.1

## Build Instructions (in CLI)
(Make sure Docker is installed)
1. git clone https://github.com/Eric15/ms3-contactsAPI.git<path to repo>
2. cd ms3-contactsAPI
3. docker run -p 49160:8080 -d augmentsoftware/ms3-contactsapi
  
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
2. /contacts/:id -- GET Identification record where contact_id = :id
3. /addresses -- GET all Address records
4. /addresses/:id -- GET all Address records where contact_id = :id
5. /communications -- GET all Communication records
6. /communications/:id -- GET all Communication records where contact_id = :id

#### PUT
* /update.html -- 3 webforms for updating records in Identification, Address, and Communication tables
1. /contact_update -- PUT to Identification record
2. /address_update -- PUT to Address record
3. /communication_update -- PUT to Communication record

#### DELETE
* /delete.html -- 3 webforms for deleting records in Identification, Address, and Communication tables
1. /contact_delete -- DELETE Identification record and associated Address and Communication records
2. /address_delete -- DELETE Address record
3. /communication_delete -- DELETE Communication record
