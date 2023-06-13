# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the custom_id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that custom_id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1 - Add custom_id Field for Agents Table

Description:
Since Facilities would like to have a custom id for each Agent they save, we need to update Agent table schema with a new custom_id field. This field should also be made a Primary Key for this table and a Foreign Key in the Facilities and Shifts Tables so that it can be used to identify eah Agent record. This can then be used by Facilities Table to to reference Agents.

Since Agents table already exists we also need to create a migration file to update all the existing Agents with the new custom_id field. For the moment we can add agent<index> as the value for the field.

Acceptance Criteria:
Given I access the Agents table
Then I can see that there is a new field called custom_id in the table
And I see that the custom_id field is a Primary Key for the Agents table
And I see that field is a Foreign Key for the Facilities and Shifts Tables

Given I view the 1st record in the Agents table
Then I see that agent0 as the custom_id for the 1st record

Time: 1-2 hrs

##

Ticket 2 - Update Internal API to Retrieve and Save custom_id field in Agents Table

Description:
We need to update the GET Agents endpoint to retrieve the custom_id for each agent. This can be done by modifying the query being called in the controller function of the route.
We also need to update POST Agents endpoint as well to save the custom_id when creating a new agent. Since the plan is to switch to this custom_id to identify the agent in the facilities, this needs to made a mandatory field and validations need to be added to make sure this field is not empty.

Acceptance Criteria:
Given I call the GET Agents endpoint
Then I can see that there is a new field called custom_id is included in all the records

Given I call the POST Agents endpoint
And I add agentcarter as custom_id along with other necessary details
Then I see that the request is successful
And in the db I can the newly made record and agentcarter as the value of the id

Given I call the POST Agents endpoint
And I don't add the custom_id field
Then the request fails
And I get an error message informing me that I need to add custom_id

Time: 6-8 hrs

##

Ticket 3 - Update getShiftsByFacility function to save Agent custom_id field

Description:
We need to update the getShiftsByFacility function to retrieve new Agent custom_id field as meta data when retrieving Shifts.

Acceptance Criteria:
Given I call getShiftsByFacility function
Then I can see that custom_id is included as metadata for Shifts

Time: 2-3 hrs

##

Ticket 4 - Update generateReport function to Use Agent custom_id field

Description:
We need to update the generateReport function to use new custom_id field included as meta data in the list of shifts

Acceptance Criteria:
Given I call generateReport function
Then I can see that custom_id is included in the generated report

Time: 1-2 hrs
