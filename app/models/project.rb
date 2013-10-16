class Project < ActiveRecord::Base
  belongs_to :user
  has_many :tasks, dependent: :destroy
  validates :name, presence: true, length: { maximum: 40 }, uniqueness: { case_sensitive: false }
end
