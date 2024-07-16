import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide child name'],
        trim: true,
    },
    admission_no: {
        type: String,
        required: [true, 'Please provide child admission number'],
        trim: true,
    },
    date_of_birth: {
        type: String,
        required: [true, 'Please provide child date of birth'],
        trim: true,
    },
    age: {
        type: Number,
        required: [true, 'Please provide child age'],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, 'Please provide child gender'],
        trim: true,
    },
    grade: {
        type: String,
        required: [true, 'Please provide child class'],
        trim: true,
    },
    residence: {
        type: String,
        required: [true, 'Please provide child residence'],
        trim: true,
    },
    term: {
        type: String,
        required: [true, 'Please provide the term'],
        trim: true,
    },
    emis_no: {
        type: String,
        required: [true, 'Please provide emis number'],
        trim: true,
    },
    parent_name: {
        type: String,
        required: [true, 'Please provide parent or guardian name'],
        trim: true,
    },
    parent_email: {
        type: String,
        required: [true, 'Please provide parent or guardian email'],
        trim: true,
    },
    parent_telephone: {
        type: String,
        required: [true, 'Please provide parent or guardian telephone'],
        trim: true,
    },
    parent_relationship_with_pupil: {
        type: String,
        required: [true, 'Please provide the parent or guardian relationship with the pupil'],
        trim: true,
    },
    parent_address: {
        type: String,
        required: [true, 'Please provide the parent or guardian address'],
        trim: true,
    },
    parent_village: {
        type: String,
        required: [true, 'Please provide the parent or guardian village'],
        trim: true,
    },
    parent_lc: {
        type: String,
        trim: true,
    },
    parent_nin: {
        type: String,
        required: [true, 'Please provide parent or guardian NIN number'],
        trim: true,
    },
    next_of_kin_name: {
        type: String,
        required: [true, 'Please provide next of kin name'],
        trim: true,
    },
    next_of_kin_gender: {
        type: String,
        required: [true, 'Please provide next of kin gender'],
        trim: true,
    },
    next_of_kin_telephone: {
        type: String,
        required: [true, 'Please provide the next of kin telephone'],
        trim: true,
    },
    next_of_kin_relationship_with_pupil: {
        type: String,
        required: [true, 'Please provide the next of kin relationship with pupil'],
        trim: true,
    },
    next_of_kin_address: {
        type: String,
        required: [true, 'Please provide the next of kin address'],
        trim: true,
    },
    next_of_kin_village: {
        type: String,
        required: [true, 'Please provide the next of kin village'],
        trim: true,
    },
    next_of_kin_lc: {
        type: String,
        trim: true,
    },
    child_medical_info: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const ChildAdmission = mongoose.models.ChildAdmission || mongoose.model('ChildAdmission', childSchema);

export default ChildAdmission;
