
exports.up = function(knex) {
    return knex.schema.createTable('shows', function(shows){
        shows.increments(); //your ID - auto fills with every new row
        
        shows.string('name', 128).notNullable(); //notNullable = REQUIRED to post
        shows.text('description').notNullable();
        shows.boolean('watched').defaultTo(false);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('shows');
};
