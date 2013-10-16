class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :name
      t.boolean :status
      t.references :project, index: true

      t.timestamps
    end
  end
end
