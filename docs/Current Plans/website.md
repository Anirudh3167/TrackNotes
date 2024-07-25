# Current Assumptions
- Authentication will be done based on Username and Password only
- Notes Id will be stored at localstorage
- Anyone can access the notes (as authentication is not implemented)
- At /notes datetime alone is creating confusion. Instead, You can try saving the first 50 characters too
- Markdown links are still not tested.

# Level 0 (Build a basic utility I.e. only focus on Notes)
- A Basic Authentication based on (Username (Unique), Password) + JWT authentication
- Notes with preview option and markdown support
- Cloud storage (by file System based working)