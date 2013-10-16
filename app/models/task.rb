class Task < ActiveRecord::Base
  belongs_to :project
  default_scope { order("priority ASC") }
  validates :name, presence: true, length: { maximum: 40 }, uniqueness: { case_sensitive: false }
  validates :deadline, presence: true
end

