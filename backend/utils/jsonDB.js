// backend/utils/jsonDB.js
const fs = require('fs').promises;
const path = require('path');

class JSONDatabase {
  constructor(filename) {
    this.filepath = path.join(__dirname, '../data', filename);
  }

  async read() {
    try {
      const data = await fs.readFile(this.filepath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async write(data) {
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
  }

  async findById(id) {
    const data = await this.read();
    return data.find(item => item.id === parseInt(id));
  }

  async create(item) {
    const data = await this.read();
    const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
    const newItem = { id: newId, ...item };
    data.push(newItem);
    await this.write(data);
    return newItem;
  }

  async update(id, updates) {
    const data = await this.read();
    const index = data.findIndex(item => item.id === parseInt(id));
    if (index === -1) return null;
    
    data[index] = { ...data[index], ...updates };
    await this.write(data);
    return data[index];
  }

  async delete(id) {
    const data = await this.read();
    const filteredData = data.filter(item => item.id !== parseInt(id));
    await this.write(filteredData);
    return true;
  }
}

module.exports = JSONDatabase;