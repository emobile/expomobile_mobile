/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 * 
 * WARNING: This is generated code. Modify at your own risk and without support.
 */
#ifdef USE_TI_UIIPHONENAVIGATIONGROUP

#import "TiUIView.h"
#import "TiWindowProxy.h"

@interface TiUIiPhoneNavigationGroup : TiUIView<UINavigationControllerDelegate> {
@private
	UINavigationController *controller;
	TiWindowProxy *root;
	TiWindowProxy *visibleProxy;
	BOOL transitionIsAnimating;
}

- (void)willAnimateRotationToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration;
- (UINavigationController*)controller;
- (void)close;

@end

#endif