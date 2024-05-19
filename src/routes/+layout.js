// @ts-nocheck
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { error, redirect } from '@sveltejs/kit';

export function load({ params }) {
    if (browser) {
        let token = localStorage.getItem('token');
        if (!token) {
            goto('/auth');
        }
    }
}