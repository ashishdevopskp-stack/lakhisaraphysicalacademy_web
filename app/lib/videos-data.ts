export const VIDEO_CATEGORY_LABELS = [
  'Army',
  'Bihar Police',
  'Daroga',
  'SSC GD',
  'Running Tips',
  'Fitness & Workout',
  'Physical Test',
  'Student Success',
  'Recruitment Updates',
  'Motivation',
] as const

export type VideoCategory = (typeof VIDEO_CATEGORY_LABELS)[number]

export const VIDEO_STATUSES = ['Published', 'Draft'] as const

export type VideoStatus = (typeof VIDEO_STATUSES)[number]