# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Update Agent Model and Database Schema

- Acceptance Criteria:
  - Add a new field `customId` to the Agent model/schema to store custom ids for each Agent.
  - Update the database schema to include the `customId` field in the Agents table.
  - The `customId` field should be optional, allowing Facilities to save their own custom ids if desired.
- Time/Effort Estimate: 2 hours
- Implementation Details:
  - Modify the Agent model/schema definition to include the `customId` field and make it optional.
  - Update the database schema by executing the necessary migration scripts or manually altering the table structure.
- Testing Criteria:
  - Write unit tests to ensure that the `customId` field is added to the Agent model/schema correctly.
  - Write unit tests to ensure that the `customId` field is optional and can be left blank.
  - Write integration tests to verify that the database schema is updated successfully and the `customId` field is persisted properly.
  - Write integration tests to verify that the `customId` field is persisted correctly when it is not empty.

### Ticket 2: Update Shifts Retrieval Function

- Acceptance Criteria:
  - Modify the `getShiftsByFacility` function to include the `customId` of the assigned Agent in the metadata returned for each Shift.
- Time/Effort Estimate: 1 hour
- Implementation Details:
  - Retrieve the `customId` of the assigned Agent from the Agent model based on the internal database id.
  - Update the metadata returned for each Shift to include the `customId`.
- Testing Criteria:
  - Write unit tests to confirm that the `getShiftsByFacility` function retrieves the Shifts with the correct metadata, including the `customId` of the assigned Agent.

### Ticket 3: Update Report Generation Function

- Acceptance Criteria:
  - Modify the `generateReport` function to use the `customId` of the assigned Agent when generating the reports.
  - Include the `customId` in the appropriate location in the generated PDF report if it is not empty.
  - Include the internal database id of the assigned Agent in the appropriate location in the generated PDF report if the `customId` is empty.
- Time/Effort Estimate: 2 hours
- Implementation Details:
  - Modify the `generateReport` function to retrieve the `customId` of the assigned Agent and use it instead of the internal database id when it is not empty.
  - Update the logic for generating the PDF report to include the `customId` in the appropriate sections.
- Testing Criteria:
  - Write unit tests to ensure that the generateReport function correctly uses the `customId` of the assigned Agent in the report generation process when it is not empty.
  - Write unit tests to ensure that the generateReport function uses the internal database id of the assigned Agent in the report generation process when the `customId` is empty.
  - Write integration tests to verify that the `customId` is included in the expected location within the generated PDF report.
  - Write integration tests to verify that the internal database id is included in the expected location within the generated PDF report when the `customId` is empty.

### Ticket 4: Facility Interface Update

- Acceptance Criteria:
  - Update the user interface for Facilities to provide and manage custom ids for Agents.
  - Add the ability for Facilities to input and save custom ids for each Agent they work with.
- Time/Effort Estimate: 3 hours
- Implementation Details:
  - Design and implement the user interface elements to input and manage custom ids for Agents.
  - Update the data handling and storage mechanisms to save and retrieve the custom ids for Facilities.
- Testing Criteria:
  - Write unit tests to validate the functionality of the updated user interface components for managing custom ids.
  - Write end-to-end tests to simulate user interactions and ensure that Facilities can successfully input and save custom ids for Agents.
