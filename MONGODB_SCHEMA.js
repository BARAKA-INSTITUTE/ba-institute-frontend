// MongoDB Schema for Inquiries Collection
// This is a reference schema - MongoDB is schemaless, but this documents the expected structure

/**
 * Collection: inquiries
 * Database: barakah-it (or as configured in MONGODB_DB_NAME)
 */

const inquirySchema = {
  // MongoDB auto-generated ID
  _id: "ObjectId",
  
  // User Information
  firstName: {
    type: "string",
    required: true,
    description: "User's first name (trimmed)"
  },
  
  lastName: {
    type: "string",
    required: true,
    description: "User's last name (trimmed)"
  },
  
  email: {
    type: "string",
    required: true,
    description: "User's email address (lowercase, trimmed, validated)",
    format: "email"
  },
  
  message: {
    type: "string",
    required: true,
    description: "User's query or message (trimmed)"
  },
  
  // Metadata
  createdAt: {
    type: "Date",
    required: true,
    description: "Timestamp when inquiry was submitted",
    default: "new Date()"
  },
  
  status: {
    type: "string",
    required: true,
    enum: ["pending", "reviewed", "resolved"],
    default: "pending",
    description: "Current status of the inquiry"
  }
};

/**
 * Example Document:
 * 
 * {
 *   "_id": ObjectId("65c3f8a9b8c9d2e4f5a6b7c8"),
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john.doe@example.com",
 *   "message": "I would like to know more about your Business Analysis courses.",
 *   "createdAt": ISODate("2024-02-07T14:30:00.000Z"),
 *   "status": "pending"
 * }
 */

/**
 * Recommended Indexes for Performance:
 * 
 * 1. Email Index (for searching by email)
 *    db.inquiries.createIndex({ "email": 1 })
 * 
 * 2. Created Date Index (for sorting by date)
 *    db.inquiries.createIndex({ "createdAt": -1 })
 * 
 * 3. Status Index (for filtering by status)
 *    db.inquiries.createIndex({ "status": 1 })
 * 
 * 4. Compound Index (for common queries)
 *    db.inquiries.createIndex({ "status": 1, "createdAt": -1 })
 */

/**
 * Useful MongoDB Queries:
 * 
 * // Get all pending inquiries, newest first
 * db.inquiries.find({ status: "pending" }).sort({ createdAt: -1 })
 * 
 * // Count total inquiries
 * db.inquiries.countDocuments()
 * 
 * // Count by status
 * db.inquiries.countDocuments({ status: "pending" })
 * 
 * // Find inquiries from specific email
 * db.inquiries.find({ email: "john@example.com" })
 * 
 * // Update status
 * db.inquiries.updateOne(
 *   { _id: ObjectId("...") },
 *   { $set: { status: "reviewed" } }
 * )
 * 
 * // Get inquiries from last 7 days
 * db.inquiries.find({
 *   createdAt: {
 *     $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
 *   }
 * })
 * 
 * // Search in messages (text search - requires text index)
 * db.inquiries.createIndex({ message: "text" })
 * db.inquiries.find({ $text: { $search: "business analysis" } })
 */

/**
 * Future Enhancements (Optional):
 * 
 * - Add 'responseMessage' field for admin replies
 * - Add 'assignedTo' for team member assignment
 * - Add 'priority' field (low, medium, high, urgent)
 * - Add 'category' field (courses, consulting, hiring, general)
 * - Add 'language' field to track form submission language
 * - Add 'ipAddress' for security/analytics
 * - Add 'userAgent' for analytics
 * - Add 'referrer' to track traffic sources
 * - Add 'tags' array for categorization
 * - Add 'attachments' array for file uploads
 */

export default inquirySchema;
