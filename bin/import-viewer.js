#!/usr/bin/env node

const path = require('path');

const { viewImports } = require('../src');

const projectPath = path.resolve(process.env.PWD);
const filePath = process.argv[2];

viewImports(projectPath, filePath);
