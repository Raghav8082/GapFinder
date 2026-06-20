import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  type:       { type: String, enum: ['video', 'docs', 'exercise', 'article'], required: true },
  title:      { type: String, required: true },
  url:        { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate'], default: 'beginner' },
  language:   { type: String, enum: ['en', 'hi'], default: 'en' },
  upvotes:    { type: Number, default: 0 },
  flagCount:  { type: Number, default: 0 },
}, { _id: false });

const SubtopicSchema = new mongoose.Schema({
  id:        { type: String, required: true },
  title:     { type: String, required: true },
  resources: [ResourceSchema],
}, { _id: false });

const SkillNodeSchema = new mongoose.Schema({
  id:             { type: String, required: true },
  title:          { type: String, required: true },
  description:    { type: String, default: '' },
  estimatedHours: { type: Number, default: 4 },
  prerequisites:  [{ type: String }],
  subtopics:      [SubtopicSchema],
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
}, { _id: false });

const LearningPathSchema = new mongoose.Schema({
  slug:        { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  category:    { type: String, enum: ['tech', 'academic', 'skill'], required: true },
  description: { type: String, default: '' },
  nodes:       [SkillNodeSchema],
  edges: [{
    from: { type: String, required: true },
    to:   { type: String, required: true },
    _id: false,
  }],
}, { timestamps: true });

export const LearningPath = mongoose.model('LearningPath', LearningPathSchema);