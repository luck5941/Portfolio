#!/usr/bin/env python3

import os, json
imgs = {}
path = 'media/lucas/img'

folders = os.listdir(path)
for folder in folders:
	if os.path.isdir("{0}/{1}".format(path, folder)):
		print("{0}/{1}".format(path, folder))
		# Si es un directorio
		imgs[folder] = []
		photos = os.listdir('media/lucas/img/%s' %folder)
		for photo in photos:
			tmp = {'c': 'white', 'r': 5}
			tmp['name'] = photo
			tmp['path'] = "{0}/{1}".format(folder, photo)
			imgs[folder].append(tmp)
	elif os.path.isfile("{0}/{1}".format(path, folder)):
		print("{0} es un file".format(folder))
	else:
		print("{0} no es un dir ni un file".format(folder))


imgs_json = open('json/img_new.json', 'w+')
imgs_json.write(json.dumps(imgs))
