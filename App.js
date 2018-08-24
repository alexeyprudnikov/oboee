/**
* alexeyprudnikov 20.07.2018
*/
import React, {Component} from 'react'
import {Alert, ActivityIndicator, Modal, Text, Image, Button, View, CameraRoll, Platform} from 'react-native'
import Swiper from 'react-native-swiper'
import ProgressImage from 'react-native-image-progress'
import * as Progress from 'react-native-progress'
//import RNFetchBlob from 'react-native-fetch-blob'
//import Share from 'react-native-share'

import Styles from './app/assets/styles'

import ImageInfo from './app/components/imageinfo'
import FilterForm from './app/containers/filterform'

const API_URL = 'https://api.unsplash.com/';
const CLIENT_ID = 'a8d07f6f2bacba5c95321a7887b7f5f27c96c49b6c04cdba40ead5e2fbf34d6f'
const CLIENT_SECRET = 'd586f3a473eb6d69dcfe9663535654e2ec2764c9238d93d3f04abc22a0eb900c'

const PER_PAGE = 10
const TYPE_LIST = 'photos'
const TYPE_SEARCH = 'search'

export default class Oboee extends Component {
	constructor(props) {
    		super(props)
		this.modalContent = null
		this.currentPage = 1
		this.type = TYPE_LIST
		this.baseUrl = this.getBaseUrl('photos/')
		this.filter = {}
		this.state = {
			isLoading: false,
			modalVisible: false
		}
		this.init()
	}
	init = () => {
		this.data = []
    		this.prevButtonDisabled = (this.currentPage > 1) ? false : true
		this.currentImageIndex = 0
	}
	componentDidMount() {
		this.getData()
	}
	render() {
		if(this.state.isLoading)
			return this.renderLoadingMessage()
		else
			return this.renderResults()
	}

	getBaseUrl = (path) => {
		return API_URL + path + '?client_id=' + CLIENT_ID + '&per_page=' + PER_PAGE
	}

	getFullUrl = () => {
		return this.baseUrl + '&page='+this.currentPage
	}

	setFilter = (filter) => {
		this._setModalVisible(false)
		this.type = TYPE_LIST
		this.currentPage = 1
		this.init()

		let url = this.getBaseUrl('photos/')
		if(filter.query !== '') {
			this.type = TYPE_SEARCH
			url = this.getBaseUrl('search/photos/') + '&query=' + filter.query
			if(filter.orientation) {
				url += '&orientation=' + filter.orientation
			}
		}
		this.baseUrl = url
		this.filter = filter
		this.getData()
	}

	getData = () => {
		this.setState({
			isLoading: true
		})
		let fullUrl = this.getFullUrl()
		this.fetchData(fullUrl)
	}

	fetchData = (url) => {
		return fetch(url)
			.then((response) => response.json())
			.then((responseJson) => {
				if(this.type === TYPE_SEARCH) {
					this.data = responseJson.results
				} else {
					this.data = responseJson
				}
				this.setState({
					isLoading: false
				})
			})
			.catch((error) =>{
				console.error(error);
      		})
	}

	renderLoadingMessage = () => {
		return(
			<View style={Styles.loadingContainer}>
				<ActivityIndicator size="small" color="#999" />
				<Text style={Styles.loadingLabel}>loading data</Text>
			</View>
		);
	}

	renderResults = () => {
		let modalContent = this.getModalContent()
		let data = this.data
		let count = data.length
		return(
			<View style={Styles.mainContainer}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						alert('Modal has been closed.');
					}}>
						<View>{modalContent}</View>
						<View>
							<Button onPress={() => {
								this._setModalVisible(false)
							}} title='Close'/>
						</View>
				</Modal>
				{
					count > 0 &&
					<Swiper loop={false} loadMinimal={true} onIndexChanged={this._onIndexChanged}>
					    {data.map((elem, index) => {
							return(
								<ProgressImage
									key={index}
									source={{uri:elem.urls.regular}}
									indicator={Progress.Bar}
									style={Styles.imageElement}>
									<Image source={{uri:elem.user.profile_image.medium}} style={Styles.userImage}/>
									<Text style={Styles.userData}>{elem.user.name}</Text>
								</ProgressImage>
							);
		        		})}
					</Swiper>
				}
				<View style={Styles.imageFilter}>
					<Button onPress={this._getImageFilter} title="filter"/>
				</View>
				{
					count > 0 &&
					<View style={Styles.imageInfo}>
						<Button onPress={this._getImageInfo} title="info"/>
					</View>
				}
				{
					count > 0 &&
					<View style={Styles.imageSave}>
						<Button onPress={this._getImageSave} title="save"/>
					</View>
				}
				{
					count > 0 &&
					<View style={Styles.prevPage}>
						<Button onPress={this._loadPrevPage} disabled={this.prevButtonDisabled} title={'prev ' + PER_PAGE}/>
					</View>
				}
				{
					count > 0 &&
					<View style={Styles.nextPage}>
						<Button onPress={this._loadNextPage} title={'next ' + PER_PAGE}/>
					</View>
				}
				{
					count == 0 &&
					<Text>no results found</Text>
				}
			</View>
		)
	}

	openModal = (data) => {
		this.setModalContent(data)
		this._setModalVisible(true)
	}

	getModalContent = () => {
		if(this.modalContent) {
			return (
				this.modalContent
			)
		} else {
			return (
				<Text></Text>
			)
		}
	}

	setModalContent = (data) => {
		this.modalContent = data
	}

	/** event callbacks **/

	_setModalVisible = (visible) => {
		this.setState({modalVisible: visible})
	}

	_onIndexChanged = (index) => {
		this.currentImageIndex = index
	}

	_getImageFilter = () => {
		let data = <FilterForm filter={this.filter} apply={this.setFilter}/>
		this.openModal(data)
	}

	_getImageInfo = () => {
		let element = this.data[this.currentImageIndex]
		let data = <ImageInfo data={element}/>
		this.openModal(data)
	}

	_getImageSave = () => {
		let element = this.data[this.currentImageIndex]
		let url = element.urls.full

		Alert.alert('Success', 'Photo added to camera roll!')
		/*if (Platform.OS === 'android') {
			RNFetchBlob
				.config({
					fileCache : true,
					appendExt : 'jpg'
				})
				.fetch('GET', url)
				.then((res) => {
					CameraRoll.saveToCameraRoll(res.path())
						.then(showAlert)
						.catch(err => console.log('err:', err))
				})
		} else {
			CameraRoll.saveToCameraRoll(url)
				.then(showAlert)
		}
		let showAlert = () => {
			Alert.alert('Success', 'Photo added to camera roll!')
		}*/
	}

	_loadPrevPage = () => {
		this.currentPage = this.currentPage - 1
		this.init()
		this.getData()
	}

	_loadNextPage = () => {
		this.currentPage = this.currentPage + 1
		this.init()
		this.getData()
	}
}
