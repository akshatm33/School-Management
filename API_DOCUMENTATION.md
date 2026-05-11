/**
 * API Documentation - POST /api/schools/addSchool
 * 
 * Complete guide for using the Add School endpoint
 */

// ============================================
// ENDPOINT DETAILS
// ============================================

METHOD: POST
URL: http://localhost:5000/api/schools/addSchool
Content-Type: application/json

// ============================================
// REQUEST BODY EXAMPLE
// ============================================

{
  "name": "Central High School",
  "address": "123 Main Street, Downtown",
  "latitude": 40.7128,
  "longitude": -74.0060
}

// ============================================
// SUCCESSFUL RESPONSE (201 Created)
// ============================================

{
  "status": "success",
  "message": "School added successfully",
  "code": "SCHOOL_CREATED",
  "data": {
    "id": 1,
    "name": "Central High School",
    "address": "123 Main Street, Downtown",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}

// ============================================
// ERROR RESPONSES
// ============================================

// ERROR 1: Missing School Name
{
  "status": "error",
  "message": "School name is required and cannot be empty",
  "code": "MISSING_NAME"
}

// ERROR 2: Missing Address
{
  "status": "error",
  "message": "School address is required and cannot be empty",
  "code": "MISSING_ADDRESS"
}

// ERROR 3: Missing Latitude
{
  "status": "error",
  "message": "Latitude is required",
  "code": "MISSING_LATITUDE"
}

// ERROR 4: Invalid Latitude (not a number)
{
  "status": "error",
  "message": "Latitude must be a valid number",
  "code": "INVALID_LATITUDE"
}

// ERROR 5: Latitude Out of Range
{
  "status": "error",
  "message": "Latitude must be between -90 and 90",
  "code": "LATITUDE_OUT_OF_RANGE"
}

// ERROR 6: Missing Longitude
{
  "status": "error",
  "message": "Longitude is required",
  "code": "MISSING_LONGITUDE"
}

// ERROR 7: Invalid Longitude (not a number)
{
  "status": "error",
  "message": "Longitude must be a valid number",
  "code": "INVALID_LONGITUDE"
}

// ERROR 8: Longitude Out of Range
{
  "status": "error",
  "message": "Longitude must be between -180 and 180",
  "code": "LONGITUDE_OUT_OF_RANGE"
}

// ERROR 9: Database Error
{
  "status": "error",
  "message": "Error adding school to database",
  "code": "INTERNAL_SERVER_ERROR",
  "error": "Error details from database"
}

// ============================================
// CURL EXAMPLES
// ============================================

// Adding a school
curl -X POST http://localhost:5000/api/schools/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Central High School",
    "address": "123 Main Street, Downtown",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'

// ============================================
// JAVASCRIPT FETCH EXAMPLE
// ============================================

fetch('http://localhost:5000/api/schools/addSchool', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Central High School',
    address: '123 Main Street, Downtown',
    latitude: 40.7128,
    longitude: -74.0060,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// ============================================
// OTHER SCHOOL ENDPOINTS
// ============================================

// Get all schools
GET http://localhost:5000/api/schools

// Get school by ID
GET http://localhost:5000/api/schools/1

// ============================================
// VALIDATION RULES
// ============================================

1. NAME:
   - Required field
   - Cannot be empty or just whitespace
   - Maximum length: 255 characters (database limit)
   - Example: "Central High School"

2. ADDRESS:
   - Required field
   - Cannot be empty or just whitespace
   - Maximum length: 500 characters (database limit)
   - Example: "123 Main Street, Downtown"

3. LATITUDE:
   - Required field
   - Must be a valid number (integer or decimal)
   - Must be between -90 and 90
   - Represents geographic latitude coordinate
   - Example: 40.7128 or -23.5505

4. LONGITUDE:
   - Required field
   - Must be a valid number (integer or decimal)
   - Must be between -180 and 180
   - Represents geographic longitude coordinate
   - Example: -74.0060 or 151.2093

// ============================================
// TESTING WITH POSTMAN
// ============================================

1. Open Postman
2. Create a new POST request
3. URL: http://localhost:5000/api/schools/addSchool
4. Go to "Body" tab
5. Select "raw"
6. Select "JSON" format
7. Paste the request body:

{
  "name": "Central High School",
  "address": "123 Main Street, Downtown",
  "latitude": 40.7128,
  "longitude": -74.0060
}

8. Click "Send"
9. Check the response

// ============================================
// TESTING WITH THUNDER CLIENT (VS Code)
// ============================================

1. Install Thunder Client extension in VS Code
2. Click Thunder Client icon
3. Click "New Request"
4. Set method to POST
5. URL: http://localhost:5000/api/schools/addSchool
6. Go to "Body" tab
7. Select "JSON"
8. Paste request body
9. Click "Send"

// ============================================
// COMMON MISTAKES TO AVOID
// ============================================

❌ WRONG: String numbers
{
  "latitude": "40.7128",  // Should be number, not string
  "longitude": "-74.0060"
}

✅ CORRECT:
{
  "latitude": 40.7128,  // Number format
  "longitude": -74.0060
}

---

❌ WRONG: Missing required fields
{
  "name": "Central High School"
  // Missing address, latitude, longitude
}

✅ CORRECT:
{
  "name": "Central High School",
  "address": "123 Main Street",
  "latitude": 40.7128,
  "longitude": -74.0060
}

---

❌ WRONG: Invalid coordinates
{
  "latitude": 100,  // Greater than 90
  "longitude": 200  // Greater than 180
}

✅ CORRECT:
{
  "latitude": 40.7128,  // Between -90 and 90
  "longitude": -74.0060  // Between -180 and 180
}

---

❌ WRONG: Empty strings
{
  "name": "",
  "address": ""
}

✅ CORRECT:
{
  "name": "Central High School",
  "address": "123 Main Street"
}

// ============================================
// HTTP STATUS CODES
// ============================================

201 - Created: School successfully added
400 - Bad Request: Validation failed (missing/invalid fields)
500 - Internal Server Error: Database connection error
503 - Service Unavailable: Database connection lost

// ============================================
// END OF DOCUMENTATION
// ============================================
