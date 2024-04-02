import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));
const RoleManagementList = lazy(() => import('../pages/RoleManagementList'));
const RoleCreationForm = lazy(() => import('../pages/RoleCreationForm'));
const ReviewPage = lazy(() => import('../pages/ReviewPage'));
const ReviewContent = lazy(() => import("../pages/ReviewContent"));
const DeletePage = lazy(() => import("../pages/DeletePage"));
import AuthRoute from '../components/AuthRoute'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Suspense fallback={<div>Loading...</div>}>
                    <ReviewPage />
                </Suspense>
            </AuthRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <AuthRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Home />
                        </Suspense>
                    </AuthRoute>
                )
            },
            {
                path: 'review',
                element: (
                    <AuthRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <ReviewContent />
                        </Suspense>
                    </AuthRoute>
                )
            },
            {
                path: 'delete',
                element: (
                    <AuthRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <DeletePage />
                        </Suspense>
                    </AuthRoute>
                )
            },
            {
                path: 'role',
                element: (
                    <AuthRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <RoleManagementList />
                        </Suspense>
                    </AuthRoute>
                )
            },
            {
                path: 'newrole',
                element: (
                    <AuthRoute>
                        <Suspense fallback={<div>Loading...</div>}>
                            <RoleCreationForm />
                        </Suspense>
                    </AuthRoute>
                )
            }
        ]
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        )
    },
    {
        path: '*',
        element: <NotFound />
    }
])


export default router