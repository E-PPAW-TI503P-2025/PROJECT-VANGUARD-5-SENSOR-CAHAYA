require("dotenv").config();
const sequelize = require("./config/sequelize");
const { QueryInterface } = require("sequelize");

async function runMigration() {
    try {
        console.log("🔄 Starting migration...");

        const queryInterface = sequelize.getQueryInterface();

        // Check if columns already exist
        const tableDesc = await queryInterface.describeTable("sensorlogs");

        if (!tableDesc.kondisi) {
            console.log("➕ Adding column: kondisi");
            await queryInterface.addColumn("sensorlogs", "kondisi", {
                type: sequelize.Sequelize.ENUM("TERANG", "GELAP"),
                allowNull: false,
                defaultValue: "GELAP"
            });
            console.log("✅ Column kondisi added");
        } else {
            console.log("⏭️  Column kondisi already exists");
        }

        if (!tableDesc.status_lampu) {
            console.log("➕ Adding column: status_lampu");
            await queryInterface.addColumn("sensorlogs", "status_lampu", {
                type: sequelize.Sequelize.ENUM("ON", "OFF"),
                allowNull: false,
                defaultValue: "ON"
            });
            console.log("✅ Column status_lampu added");
        } else {
            console.log("⏭️  Column status_lampu already exists");
        }

        console.log("\n✅ Migration completed successfully!");

        // Show final table structure
        const finalDesc = await queryInterface.describeTable("sensorlogs");
        console.log("\n📋 Final table structure:");
        console.log(Object.keys(finalDesc));

        process.exit(0);
    } catch (error) {
        console.error("❌ Migration failed:", error.message);
        console.error(error);
        process.exit(1);
    }
}

runMigration();
