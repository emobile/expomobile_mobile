//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"development";
NSString * const TI_APPLICATION_ID = @"mx.com.emobile.expomobile";
NSString * const TI_APPLICATION_PUBLISHER = @"Emobile";
NSString * const TI_APPLICATION_URL = @"http://emobile.com.mx";
NSString * const TI_APPLICATION_NAME = @"Expomobile";
NSString * const TI_APPLICATION_VERSION = @"1.0.2";
NSString * const TI_APPLICATION_DESCRIPTION = @"App for events management";
NSString * const TI_APPLICATION_COPYRIGHT = @"2013 by Emobile";
NSString * const TI_APPLICATION_GUID = @"56f01eed-9c22-4c92-9e21-00f65e043be3";
BOOL const TI_APPLICATION_ANALYTICS = true;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
