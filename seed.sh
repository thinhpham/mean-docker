#!/bin/sh
mongoimport --db mean-docker --collection users --drop --file ./seed.json