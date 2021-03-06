'use strict';

/* global Connector */

function setupNewPandoraPlayer() {
	Connector.playerSelector = '.region-bottomBar';

	Connector.artistSelector = '.Tuner__Audio__TrackDetail__artist';

	Connector.trackSelector = '.Tuner__Audio__TrackDetail__title';

	Connector.durationSelector = 'span[data-qa="remaining_time"]';

	Connector.trackArtImageSelector = '.Tuner__Audio__TrackDetail__img img';

	Connector.isPlaying = function() {
		// #ic_play_7a43ed1f23aeda3fadb7bdaa3bb07cbe
		// #ic_pause_829b1bd4f7297ce64c54560a4a499300
		let playButtonHref = $('.PlayButton use').attr('xlink:href');
		return playButtonHref.startsWith('#ic_pause');
	};
}

function setupPandoraPlayer() {
	Connector.playerSelector = '#playbackControl';

	Connector.trackArtImageSelector = '.playerBarArt';

	Connector.albumSelector = 'a.playerBarAlbum';

	Connector.artistSelector = 'a.playerBarArtist';

	Connector.trackSelector = 'a.playerBarSong';

	Connector.playButtonSelector = 'div.playButton';

	Connector.isStateChangeAllowed = function() {
		return getElapsedTime() > 0;
	};

	Connector.getDuration = function () {
		return getElapsedTime() + getRemainingTime();
	};

	function getElapsedTime() {
		let timeStr = $('div.elapsedTime').text();
		return Connector.stringToSeconds(timeStr);
	}

	function getRemainingTime() {
		// Remove 'minus' sign
		let timeStr = $('div.remainingTime').text().substring(1);
		return Connector.stringToSeconds(timeStr);
	}
}

function isNewPandoraPlayer() {
	return $('#playbackControl').length === 0;
}

function setupConnector() {
	if (isNewPandoraPlayer()) {
		setupNewPandoraPlayer();
	} else {
		setupPandoraPlayer();
	}
}

setupConnector();
