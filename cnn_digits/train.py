from keras.datasets import mnist
import matplotlib.pyplot as plt
import numpy as np
from keras.layers import Flatten
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import Dropout
from keras.layers.convolutional import MaxPooling2D

from keras.utils import np_utils
from keras.layers.convolutional import Conv2D

(X_train,Y_train),(X_test,Y_test)= mnist.load_data()
print(X_train.shape[0])

X_train=X_train.reshape(X_train.shape[0],28,28,1)
X_train.shape
Y_train = np_utils.to_categorical(Y_train)
Y_test = np_utils.to_categorical(Y_test)
Y_test.shape[1]
sizeDim=X_train[0].shape[0]*X_train[0].shape[1]
print(sizeDim)
X_train=X_train/255
Y_train=Y_train/255

model = Sequential()
model.add(Conv2D(30, (3, 3), input_shape=(28, 28,1), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Conv2D(15, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(50, activation='relu'))
model.add(Dense(10, activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
hist=model.fit(X_train,Y_train,epochs=3,batch_size=300,verbose=2)
model.evaluate(X_train,Y_train,verbose=2)
model_trained = model.to_json()
with open("model_trained.json", "w") as json_file:
    json_file.write(model_trained)
model.save_weights("model_trained.h5")
accuracy=hist.history['acc']
x=range(len(accuracy))

data=np.array([x,accuracy])
np.savetxt("data.csv",data,delimiter=",")

