import React, {Component} from 'react'
import {StyleSheet, Dimensions} from 'react-native'

let {width, height} = Dimensions.get('window')

export default Styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
	    	flexDirection: 'row',
	    	justifyContent: 'center',
	    	alignItems: 'center',
	    	backgroundColor: '#fff'
	},
	loadingLabel: {
		marginLeft: 10,
		color: '#999'
	},
	mainContainer: {
		flex: 1,
	    	flexDirection: 'row',
	    	justifyContent: 'center',
	    	alignItems: 'center',
	    	backgroundColor: '#fff'
	},
	imageElement: {
		flex: 1,
		width: width,
		height: height,
		backgroundColor: '#fff'
	},
    imageFilter: {
		position: 'absolute',
	    	top: 34,
	    	right: 20
	},
	imageInfo: {
		position: 'absolute',
	    	top: 74,
	    	right: 20
	},
	imageSave: {
		position: 'absolute',
	    	top: 114,
	    	right: 20
	},
	userImage: {
		position: 'absolute',
	    	padding: 2,
	    	paddingLeft: 5,
	    	top: 20,
	    	left: 20,
	    	width: 50,
	    	height: 50,
	    	borderRadius: 25,
	    	borderWidth: 2,
	    	borderColor: '#fff'
	},
	userData: {
		position: 'absolute',
		color: '#fff',
		fontSize: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		paddingTop: 0,
		paddingBottom: 2,
		paddingLeft: 5,
		paddingRight: 5,
		top: 34,
		left: 80,
		fontWeight: 'bold',
		maxWidth: width/2
	},
	prevPage: {
		position: 'absolute',
		bottom: 20,
	    	left: 20,
	},
	nextPage: {
		position: 'absolute',
		bottom: 20,
	    	right: 20,
	}
})
