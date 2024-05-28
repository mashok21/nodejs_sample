const taskValidatorSchema = {
    title: {
        in: ['body'],
        exists: {
            errorMessage: "field is required"
        },
        notEmpty: {
            errorMessage: "title should not be empty"
        },
        trim: true
    },
    description: {
        in: ['body'],
        exists: {
            errorMessage: "description field is required"
        },
        notEmpty: {
            errorMessage:  "description cannot be empty"
        },
        trim: true
    },
    status: {
        in: ['body'],
        exists: {
            errorMessage: "status is required"
        },
        notEmpty: {
            errorMessage: "status cannot be empty"
        },
        isIn : {
            options: [['pending', 'in-progress', 'completed']],
            errorMessage: "not a valid option"
        }
    }
}

const idValidationSchema = {
    id : {
        in: ['params'],
        isMongoId: {
            errorMessage : "Invalid object id format"
        },
    }
}

module.exports = {taskValidatorSchema, idValidationSchema}