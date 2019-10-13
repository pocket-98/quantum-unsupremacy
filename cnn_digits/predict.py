#!/usr/bin/env python3
import sys
from PIL import Image
from keras.models import load_model
from io import BytesIO
import base64
import numpy as np
import matplotlib.pyplot as plt

data = sys.argv[1]
data2 = sys.argv[2]

datatrim = data.split("base64,")[1]
data2trim = data2.split("base64,")[1]
new_model= load_model("network.h5") #Here we load the model, as on our website this is in a new file.

#Converts input string into a pillow image
im = Image.open(BytesIO(base64.b64decode(datatrim))).resize((28,28))
pix = np.array(im.getdata()).reshape(im.size[1], im.size[0], 4)
im2 = Image.open(BytesIO(base64.b64decode(data2trim))).resize((28,28))
pix2 = np.array(im2.getdata()).reshape(im2.size[1], im2.size[0], 4)

#Creates an image that, instead of using Red Green Blue only takes in one value
newimg = (pix[:,:,0] + pix[:,:,1] + pix[:,:,2] + pix[:,:,3])
newimg2 = (pix2[:,:,0] + pix2[:,:,1] + pix2[:,:,2] + pix2[:,:,3])
maximg = np.max(newimg)
maximg2 = np.max(newimg2)
nodigit = False
if np.abs(maximg) <= 5:
  normimg = 0*newimg
  nodigit = True
else:
  normimg = newimg.astype("float32") / maximg

normimg2 = newimg2.astype("float32") / maximg2

#set_orig=np.zeros((28,28))
#for i in range(len(pix)):
#  for j in range(len(pix[1])):
#    set_orig[i][j]=np.linalg.norm(pix[i][j])
#inp_img = normimg.reshape(1,28,28,1)
#Here we convert our data into a rank 4 tensor

#pred = new_model.predict_classes(inp_img)
if not nodigit:
  pred = new_model.predict(normimg.reshape(1,28,28,1), batch_size=1)[0]
  #Prints out probability
  print("[" + (",").join(["%.3f" % prob for prob in pred]) + "]")
  #prints out value
  print(f"{np.argmax(pred)}")
else:
  print([1.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0])
  print(0)


pred2 = new_model.predict(normimg2.reshape(1,28,28,1), batch_size=1)[0]
print("[" + (",").join(["%.3f" % prob for prob in pred2]) + "]")
#prints out value
print(f"{np.argmax(pred2)}")
